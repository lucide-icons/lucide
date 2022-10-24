package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Crown: ImageVector
    get() {
        if (_crown != null) {
            return _crown!!
        }
        _crown = Builder(name = "Crown", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(2.0f, 4.0f)
                lineToRelative(3.0f, 12.0f)
                horizontalLineToRelative(14.0f)
                lineToRelative(3.0f, -12.0f)
                lineToRelative(-6.0f, 7.0f)
                lineToRelative(-4.0f, -7.0f)
                lineToRelative(-4.0f, 7.0f)
                lineToRelative(-6.0f, -7.0f)
                close()
                moveTo(5.0f, 20.0f)
                horizontalLineToRelative(14.0f)
            }
        }
        .build()
        return _crown!!
    }

private var _crown: ImageVector? = null
