package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.TreePine: ImageVector
    get() {
        if (_treePine != null) {
            return _treePine!!
        }
        _treePine = Builder(name = "TreePine", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(17.0f, 14.0f)
                lineToRelative(3.0f, 3.3f)
                arcToRelative(1.0f, 1.0f, 0.0f, false, true, -0.7f, 1.7f)
                horizontalLineTo(4.7f)
                arcToRelative(1.0f, 1.0f, 0.0f, false, true, -0.7f, -1.7f)
                lineTo(7.0f, 14.0f)
                horizontalLineToRelative(-0.3f)
                arcToRelative(1.0f, 1.0f, 0.0f, false, true, -0.7f, -1.7f)
                lineTo(9.0f, 9.0f)
                horizontalLineToRelative(-0.2f)
                arcTo(1.0f, 1.0f, 0.0f, false, true, 8.0f, 7.3f)
                lineTo(12.0f, 3.0f)
                lineToRelative(4.0f, 4.3f)
                arcToRelative(1.0f, 1.0f, 0.0f, false, true, -0.8f, 1.7f)
                horizontalLineTo(15.0f)
                lineToRelative(3.0f, 3.3f)
                arcToRelative(1.0f, 1.0f, 0.0f, false, true, -0.7f, 1.7f)
                horizontalLineTo(17.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 22.0f)
                verticalLineToRelative(-3.0f)
            }
        }
        .build()
        return _treePine!!
    }

private var _treePine: ImageVector? = null
