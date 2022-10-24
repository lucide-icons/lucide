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

public val Lucide.Shrink: ImageVector
    get() {
        if (_shrink != null) {
            return _shrink!!
        }
        _shrink = Builder(name = "Shrink", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(15.0f, 15.0f)
                lineToRelative(6.0f, 6.0f)
                moveToRelative(-6.0f, -6.0f)
                verticalLineToRelative(4.8f)
                moveToRelative(0.0f, -4.8f)
                horizontalLineToRelative(4.8f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(9.0f, 19.8f)
                verticalLineTo(15.0f)
                moveToRelative(0.0f, 0.0f)
                horizontalLineTo(4.2f)
                moveTo(9.0f, 15.0f)
                lineToRelative(-6.0f, 6.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(15.0f, 4.2f)
                verticalLineTo(9.0f)
                moveToRelative(0.0f, 0.0f)
                horizontalLineToRelative(4.8f)
                moveTo(15.0f, 9.0f)
                lineToRelative(6.0f, -6.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(9.0f, 4.2f)
                verticalLineTo(9.0f)
                moveToRelative(0.0f, 0.0f)
                horizontalLineTo(4.2f)
                moveTo(9.0f, 9.0f)
                lineTo(3.0f, 3.0f)
            }
        }
        .build()
        return _shrink!!
    }

private var _shrink: ImageVector? = null
