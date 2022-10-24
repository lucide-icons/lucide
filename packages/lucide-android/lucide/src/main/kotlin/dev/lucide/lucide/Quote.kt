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

public val Lucide.Quote: ImageVector
    get() {
        if (_quote != null) {
            return _quote!!
        }
        _quote = Builder(name = "Quote", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(3.0f, 21.0f)
                curveToRelative(3.0f, 0.0f, 7.0f, -1.0f, 7.0f, -8.0f)
                verticalLineTo(5.0f)
                curveToRelative(0.0f, -1.25f, -0.756f, -2.017f, -2.0f, -2.0f)
                horizontalLineTo(4.0f)
                curveToRelative(-1.25f, 0.0f, -2.0f, 0.75f, -2.0f, 1.972f)
                verticalLineTo(11.0f)
                curveToRelative(0.0f, 1.25f, 0.75f, 2.0f, 2.0f, 2.0f)
                curveToRelative(1.0f, 0.0f, 1.0f, 0.0f, 1.0f, 1.0f)
                verticalLineToRelative(1.0f)
                curveToRelative(0.0f, 1.0f, -1.0f, 2.0f, -2.0f, 2.0f)
                reflectiveCurveToRelative(-1.0f, 0.008f, -1.0f, 1.031f)
                verticalLineTo(20.0f)
                curveToRelative(0.0f, 1.0f, 0.0f, 1.0f, 1.0f, 1.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(15.0f, 21.0f)
                curveToRelative(3.0f, 0.0f, 7.0f, -1.0f, 7.0f, -8.0f)
                verticalLineTo(5.0f)
                curveToRelative(0.0f, -1.25f, -0.757f, -2.017f, -2.0f, -2.0f)
                horizontalLineToRelative(-4.0f)
                curveToRelative(-1.25f, 0.0f, -2.0f, 0.75f, -2.0f, 1.972f)
                verticalLineTo(11.0f)
                curveToRelative(0.0f, 1.25f, 0.75f, 2.0f, 2.0f, 2.0f)
                horizontalLineToRelative(0.75f)
                curveToRelative(0.0f, 2.25f, 0.25f, 4.0f, -2.75f, 4.0f)
                verticalLineToRelative(3.0f)
                curveToRelative(0.0f, 1.0f, 0.0f, 1.0f, 1.0f, 1.0f)
                close()
            }
        }
        .build()
        return _quote!!
    }

private var _quote: ImageVector? = null
